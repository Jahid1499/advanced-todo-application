type ErrorPopsTypes = {
  message: string;
};

export default function Error({ message }: ErrorPopsTypes) {
  return (
    <div className="max-w-7xl col-span-12 w-full flex h-10 items-center justiry-center mx-auto p-2 rounded mb-2 text-red-700 bg-red-100">
      {message}
    </div>
  );
}
