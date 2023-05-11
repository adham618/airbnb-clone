"use client";

import * as React from "react";

import useRentModal from "@/hooks/useRentModal";

import Heading from "@/components/Heading";
import CategoryInput from "@/components/inputs/CategoryInput";
import { categories } from "@/components/Layout/Header/Categories";

import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  Price = 5,
}
export default function RentModal() {
  const rentModal = useRentModal();
  const [step, setStep] = React.useState(STEPS.CATEGORY);

  const OnBack = () => {
    setStep((prev) => prev - 1);
  };

  const OnNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = React.useMemo(() => {
    if (step === STEPS.Price) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subTitle="Pick a category"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              // onClick={}
              selected={false}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : OnBack}
      body={bodyContent}
      disabled={false}
    />
  );
}
