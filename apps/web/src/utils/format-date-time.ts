const formatDateTime = (
  dateTime: string,
  format: "HH:MM A" | "D, MMM, YYYY" | "D, MMM, YYYY HH:MM A" = "D, MMM, YYYY HH:MM A",
) => {
  console.log({ dateTime, format });

  switch (format) {
    case "HH:MM A":
      return new Date(dateTime).toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    case "D, MMM, YYYY":
      return new Date(dateTime).toLocaleString("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    case "D, MMM, YYYY HH:MM A":
      return new Date(dateTime).toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    default:
      return new Date(dateTime).toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
  }
};

export default formatDateTime;
