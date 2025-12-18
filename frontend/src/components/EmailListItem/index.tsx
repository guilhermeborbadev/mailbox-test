import { Stack, Typography } from "@mui/material";

type EmailListItemProps = {
  to: string;
  subject: string;
  body: string;
  selected?: boolean;
};

const EmailListItem = ({ selected, to, subject, body }: EmailListItemProps) => {
  return (
    <Stack
      sx={{
        p: 3,
        cursor: "pointer",
        backgroundColor: selected ? "primary.light" : "white",
        transition: "all .2s",
        ":hover": {
          borderColor: "grey.500",
          backgroundColor: "grey.300",
        },
      }}
    >
      <Typography variant="h6" color={selected ? "white" : "black"}>
        {to}
      </Typography>
      <Typography variant="body1" color={selected ? "white" : "grey.800"}>
        {subject}
      </Typography>
      <Typography variant="body2" color={selected ? "white" : "grey.500"}>
        {body}
      </Typography>
    </Stack>
  );
};

export default EmailListItem;
