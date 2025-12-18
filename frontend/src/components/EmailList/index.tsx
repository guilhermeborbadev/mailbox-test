import { Box, Divider } from "@mui/material";
import EmailListItem from "../EmailListItem";

type Email = {
  id: number;
  to: string;
  subject: string;
  body: string;
};

type EmailListProps = {
  emails: Email[];
  selectedEmailId: number;
  onSelectEmail: (id: number) => void;
};

const EmailList = ({
  emails,
  selectedEmailId,
  onSelectEmail,
}: EmailListProps) => {
  return (
    <Box>
      {emails.map((email) => (
        <Box key={email.id} onClick={() => onSelectEmail(email.id)}>
          <EmailListItem
            selected={selectedEmailId === email.id}
            to={email.to}
            subject={email.subject}
            body={email.body}
          />
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default EmailList;
