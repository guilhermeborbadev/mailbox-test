import { Box, Divider, Stack, Typography } from "@mui/material";

type EmailPreviewProps = {
  email: {
    to: string;
    subject: string;
    body: string;
  };
};

const EmailPreview = ({ email }: EmailPreviewProps) => {
  if (!email) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h5">No email selected.</Typography>
          <Typography variant="body2" color="grey.800">
            Select one email on the side to preview.
          </Typography>
        </Stack>
      </Box>
    );
  }
  return (
    <Stack spacing={2} sx={{ p: 3 }}>
      <Box>
        <Typography variant="h6">{email.to}</Typography>
        <Typography variant="body1" color="grey.800">
          {email.subject}
        </Typography>
      </Box>
      <Divider />
      <Typography variant="body2">{email.body}</Typography>
    </Stack>
  );
};

export default EmailPreview;
