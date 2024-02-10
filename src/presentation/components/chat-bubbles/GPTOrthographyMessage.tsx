type GPTOrthographyMessageProps = {
  userScore: number;
  errors: string[];
  message: string;
};

export const GPTOrthographyMessage = ({
  userScore,
  errors,
  message,
}: GPTOrthographyMessageProps) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          R
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <h3 className="text-2xl">Score: {userScore}%</h3>
          <p>{message}</p>

          {errors.length === 0 ? (
            <p>Perfect! No errors were found</p>
          ) : (
            <>
              <h3 className="text-xl">Found errors</h3>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
