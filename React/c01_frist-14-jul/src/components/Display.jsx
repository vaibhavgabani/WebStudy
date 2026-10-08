const Display = (props) => {
  return (
    <div className="display">
      <input type="text" value={props.value} readOnly />
    </div>
  );
};

export default Display;