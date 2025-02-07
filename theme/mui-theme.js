import { CUSTOM_COLORS } from "./colors";

export const custom_styling = {
  primaryButton: {
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 20,
    backgroundColor: CUSTOM_COLORS.SECONDARY,
    color: CUSTOM_COLORS.WHITE,
    border: `2px solid ${CUSTOM_COLORS.SECONDARY}`,
    fontWeight: "400",
    "&:hover": {
      backgroundColor: CUSTOM_COLORS.WHITE,
      color: CUSTOM_COLORS.SECONDARY,
    },
  },
  secondaryButton: {
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 20,
    backgroundColor: CUSTOM_COLORS.WHITE,
    color: CUSTOM_COLORS.SECONDARY,
    border: `2px solid ${CUSTOM_COLORS.SECONDARY}`,
    fontWeight: "400",
    "&:hover": {
      backgroundColor: CUSTOM_COLORS.SECONDARY + "30",
      color: CUSTOM_COLORS.SECONDARY,
    },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      borderColor: CUSTOM_COLORS.SECONDARY,
      backgroundColor: CUSTOM_COLORS.WHITE,
      "& fieldset": {
        border: `2px solid ${CUSTOM_COLORS.SECONDARY}`,
      },
      "&:hover fieldset": {
        borderColor: CUSTOM_COLORS.PRIMARY,
      },
      "&.Mui-focused": {
        borderColor: CUSTOM_COLORS.SECONDARY,
        boxShadow: `0 0 5px ${CUSTOM_COLORS.SECONDARY}`,
        "& fieldset": {
          borderColor: CUSTOM_COLORS.PRIMARY,
        },
      },
    },
    "& .MuiInputBase-input": {
      color: CUSTOM_COLORS.BLACK,
      fontSize: "16px",
      padding: "10px 15px",
    },
    "& .MuiInputLabel-root": {
      color: CUSTOM_COLORS.GRAY_LIGHT,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: CUSTOM_COLORS.PRIMARY,
    },
  },
  secondaryTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      "& fieldset": {
        borderColor: "#DF1F5A",
      },
      "&:hover fieldset": {
        borderColor: "#DF1F5A",
      },
      "&.Mui-focused fieldset": {

        borderColor: "#DF1F5A",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#DF1F5A",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#DF1F5A",
    },
  },

  select: {
    '& .MuiOutlinedInput-root': {
      color: '#DF1F5A', // Text color
      '& fieldset': {
        borderColor: '#DF1F5A', // Default border color
      },
      '&:hover fieldset': {
        borderColor: '#DF1F5A', // Hover border color
      },
      '&.Mui-focused fieldset': {
        borderColor: '#DF1F5A', // Focus border color
      },
    },
    '& .MuiSvgIcon-root': {
      color: '#DF1F5A', // Dropdown icon color
    },
  },
  menuItem: {
    color: '#DF1F5A', // Menu item text color
    '&:hover': {
      backgroundColor: '#FDE9ED', // Light hover background
    },
  },
};
