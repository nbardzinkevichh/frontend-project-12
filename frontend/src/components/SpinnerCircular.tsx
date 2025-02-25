import { SpinnerCircular } from 'spinners-react';

export const Spinner = (isLoading) => {
  return (
    { isLoading &&
      <SpinnerCircular size={50} thickness={140} speed={100} color="rgba(20, 68, 230, 1)" secondaryColor="rgba(0, 0, 0, 0.44)">
    }
  )
};
