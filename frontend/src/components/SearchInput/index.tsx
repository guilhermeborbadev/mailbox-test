import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") ?? "";
  const [value, setValue] = useState(urlSearch);
  const debouncedValue = useDebouncedValue(value, 300);

  useEffect(() => {
    if (debouncedValue === urlSearch) return;

    const params = new URLSearchParams();
    if (debouncedValue) {
      params.set("search", debouncedValue);
    }

    router.replace(`?${params.toString()}`);
  }, [debouncedValue, urlSearch, router]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "grey.400",
      }}
    >
      <InputBase
        sx={{ p: 2, ml: 1, flex: 1 }}
        placeholder="Search email"
        inputProps={{ "aria-label": "search email" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
