import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const fetchWikiData = async () => {
    if (!query.trim()) return;

    const response = await fetch("http://localhost:8000/wiki", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    setAnswer(data.result);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, backgroundColor: "#ffffff", p: 4, borderRadius: 2 }}>
      
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
              color: "#ffffff"
            },
          }}
        />

        <Button
          variant="contained"
          onClick={fetchWikiData}
        >
          <Typography fontFamily={"'Bowlby One', sans-serif"}>
            Search
          </Typography>
        </Button>
      </Box>

      {/* Result Content (NO BOX) */}
      {answer && (
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.7,
            textAlign: "justify",
            fontFamily: "'Short Stack', cursive",
            fontSize: "18px",
            color: "#222222"
          }}
        >
          {answer}
        </Typography>
      )}

    </Container>
  );
}

export default App;
