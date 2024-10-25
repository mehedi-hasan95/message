interface Props {
  label: string;
  message: string;
}
export const Section = ({ label, message }: Props) => {
  return (
    <div>
      <p className="text-sm font-medium md:text-lg lg:text-xl">{label}</p>
      <p className="text-sm font-light">{message}</p>
    </div>
  );
};
