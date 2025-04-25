interface StepTimelineProps {
  currentStep: number;
}

const steps = [
  { label: "Complete Profile" },
  { label: "Add Your First Meal" },
  { label: "Access Dashboard" },
];

export default function StepTimeline({ currentStep }: StepTimelineProps) {
  return (
    <div className="flex justify-between items-center relative">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 text-center relative">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white font-bold
            ${index <= currentStep ? "bg-green-500" : "bg-gray-300"}`}
          >
            {index + 1}
          </div>
          <p className="mt-2 text-sm">{step.label}</p>

          {index < steps.length && (
            <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-300 z-[-1]">
              <div
                className={`h-full ${
                  index < currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
