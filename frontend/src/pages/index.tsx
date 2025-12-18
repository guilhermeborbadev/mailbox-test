import EmailList from "@/components/EmailList";
import EmailPreview from "@/components/EmailPreview";
import NewEmailForm from "@/components/NewEmailForm";
import SearchInput from "@/components/SearchInput";
import useEmailsLookup from "@/hooks/useEmailsLookup";
import { CreateOutlined } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function Home() {
  const [selectedEmailId, setSelectedEmailId] = useState<number>();
  const [newEmailModalOpen, setNewEmailModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? undefined;

  const { isLoading, refetch, data: emails } = useEmailsLookup(search);

  const selectedEmail = useMemo(() => {
    if (!emails) {
      return;
    }
    return emails.find((email) => email.id === selectedEmailId);
  }, [emails, selectedEmailId]);

  function handleOnSelectEmail(id: number) {
    setNewEmailModalOpen(false);
    setSelectedEmailId(id);
  }

  console.log(emails);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      {!newEmailModalOpen && (
        <Box sx={{ position: "absolute", top: 12, right: 12 }}>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => setNewEmailModalOpen(true)}
          >
            <CreateOutlined
              sx={{
                p: 0.5,
                borderRadius: 1,
                border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                transition: ".3 all",
                ":hover": {
                  borderColor: "grey.500",
                  backgroundColor: "grey.300",
                },
              }}
            />
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "55%",
            },
            maxHeight: "100vh",
            overflowY: "scroll",
          }}
        >
          <SearchInput />
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={48} />
            </Box>
          )}
          <EmailList
            emails={emails || []}
            selectedEmailId={selectedEmailId}
            onSelectEmail={handleOnSelectEmail}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            flex: "none",
            borderLeftColor: "grey.300",
            borderLeftStyle: "solid",
            borderLeftWidth: 1,
            minHeight: "100vh",
          }}
        >
          {newEmailModalOpen ? (
            <NewEmailForm
              onNewEmail={() => {
                refetch(search);
              }}
              onClose={() => setNewEmailModalOpen(false)}
            />
          ) : (
            <EmailPreview email={selectedEmail} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
