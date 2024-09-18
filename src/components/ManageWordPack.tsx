import {
  Autocomplete,
  Button,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext, supabase } from "../utils/supabaseClient";

export default function ManageWordPack() {
  const MIN_ROWS = 25;
  const MAX_ROWS = 25;

  const [wordPacks, setWordPacks] = useState<any>([]);
  const [selectedWordPack, setSelectedWordPack] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [words, setWords] = useState("");
  const [meanings, setMeanings] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getWordPacks();
  }, []);

  useEffect(() => {
    setTitle(selectedWordPack?.name ?? "");
    setWords(selectedWordPack?.words ?? "");
    setMeanings(selectedWordPack?.meanings ?? "");
  }, [selectedWordPack]);

  async function getWordPacks() {
    const { data } = await supabase
      .from("WordPack")
      .select()
      .eq("created_by", user?.id ?? "");
    setWordPacks(data);
  }

  async function handleSave() {
    if (!title || !words || !meanings) {
      return;
    }

    const rest = {
      name: title,
      words: words,
      meanings: meanings,
    };

    const wordPacktoUpsert = selectedWordPack?.id
      ? {
          id: selectedWordPack?.id,
          ...rest,
        }
      : rest;

    await supabase.from("WordPack").upsert([wordPacktoUpsert]).select();

    window.location.reload();
  }

  return (
    <>
      <Grid2 container direction="column" spacing={1}>
        <Typography variant="h4">Manage Word Pack</Typography>

        <Grid2 container direction="row" size={12}>
          <Autocomplete
            disablePortal
            value={selectedWordPack}
            options={wordPacks}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Word Packs" />
            )}
            onChange={(_event: any, newValue) => {
              setSelectedWordPack(newValue);
            }}
            fullWidth
          />

          <TextField
            label="Word Pack Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
          ></TextField>
        </Grid2>
        <Grid2>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={1} mt={2}>
        <Grid2 container direction="row" size={12}>
          <Grid2 size={6}>
            <TextField
              label="Words"
              multiline
              minRows={MIN_ROWS}
              maxRows={MAX_ROWS}
              value={words}
              onChange={(event) => setWords(event.target.value)}
              fullWidth
            ></TextField>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Meanings"
              multiline
              minRows={MIN_ROWS}
              maxRows={MAX_ROWS}
              value={meanings}
              onChange={(event) => setMeanings(event.target.value)}
              fullWidth
            ></TextField>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}
