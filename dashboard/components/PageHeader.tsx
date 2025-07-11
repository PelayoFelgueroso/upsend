interface Props {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};
