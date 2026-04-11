const Notification = ({ message }) => {
  const style = {
    color: "white",
    backgroundColor: "green",
    padding: "16px",
    borderRadius: "8px",
    margin: "8px 0 8px 0"
  };

  if (message === null) return null

  return <div style={style}>{message}</div>;
};

export default Notification;
