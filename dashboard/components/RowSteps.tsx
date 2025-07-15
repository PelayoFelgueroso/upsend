interface Step {
  title: string;
  description: string;
}

interface Props {
  steps: Step[];
}

export const RowSteps = ({ steps }: Props) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {steps.map((step, index) => (
        <Step
          key={index}
          order={index + 1}
          title={step.title}
          description={step.description}
        />
      ))}
    </div>
  );
};

interface StepProps {
  order: number;
  title: string;
  description: string;
}

const Step = ({ order, title, description }: StepProps) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
        {order}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
