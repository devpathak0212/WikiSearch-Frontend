import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWikiData = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch(
        "https://wikisearch-backend.onrender.com/wiki",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setAnswer(data.result);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 6, backgroundColor: "#ffffff", p: 4, borderRadius: 2 }}
    >
      {/* Application Title */}
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        textAlign={"center"}
        fontFamily={"'Bowlby One', sans-serif"}
        color="#1976D2"
      >
        WikiSearch
      </Typography>

      {/* Additional Line */}
      <Typography
        variant="h5"
        component="h3"
        gutterBottom
        textAlign={"center"}
        fontFamily={"'Short Stack', cursive"}
      >
        WikiSearch provides concise summaries from Wikipedia articles!!!!
      </Typography>

      {/* Input */}
      <Box display="flex" gap={2} mb={4}>
        <TextField
          fullWidth
          placeholder="Search about anything of your choice..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWikiData()}
          InputProps={{
            style: {
              fontFamily: "'Short Stack', cursive",
              fontSize: "16px",
              backgroundColor: "#222222",
              color: "#ffffff",
            },
          }}
        />

        <Button variant="contained" onClick={fetchWikiData} disabled={loading}>
          <Typography fontFamily={"'Bowlby One', sans-serif"}>
            Search
          </Typography>
        </Button>
      </Box>

      {/* Loading Spinner */}
      {loading && (
        <Box display="flex" justifyContent="center" mb={2}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography color="error" textAlign="center" mb={2}>
          {error}
        </Typography>
      )}

      {/* Result Content */}
      {answer && (
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.7,
            textAlign: "justify",
            fontFamily: "'Short Stack', cursive",
            fontSize: "18px",
            color: "#222222",
          }}
        >
          {answer}
        </Typography>
      )}
    </Container>
  );
}

export default App;
