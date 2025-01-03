type ErrorProps = {
  message: string;
};

function Errors({ message }: ErrorProps) {
  return (
    <div>
      <p className="text-red-500 text-sm">{message}</p>
    </div>
  );
}

export default Errors;
