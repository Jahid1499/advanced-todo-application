type SuccessPopsTypes = {
  message: string;
};

export default function Success({ message }: SuccessPopsTypes) {
  return (
    <div className="max-w-7xl col-span-12 w-full flex h-10 items-center justiry-center mx-auto p-2 text-teal-700 bg-teal-100">
      {message}
    </div>
  );
}
