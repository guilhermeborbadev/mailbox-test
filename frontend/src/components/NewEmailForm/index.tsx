import config from "@/constants/config";
import { Send } from "@mui/icons-material";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

type Email = {
  id: number;
  to: string;
  subject: string;
  body: string;
};

type NewEmailFormProps = {
  onNewEmail: () => void;
  onClose: () => void;
};

const NewEmailForm = ({ onClose, onNewEmail }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  function handleSend() {
    fetch(`${config.apiUrl}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        cc,
        bcc,
        subject,
        body,
      }),
    })
      .then(() => {
        onNewEmail();
        onClose();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={2}>
        <TextField
          label="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          fullWidth
        />

        <TextField
          label="CC"
          value={cc}
          onChange={(e) => setCc(e.target.value)}
          fullWidth
        />

        <TextField
          label="BCC"
          value={bcc}
          onChange={(e) => setBcc(e.target.value)}
          fullWidth
        />

        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
        />

        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          multiline
          minRows={6}
          fullWidth
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>

          <Button variant="contained" endIcon={<Send />} onClick={handleSend}>
            Send Email
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NewEmailForm;
