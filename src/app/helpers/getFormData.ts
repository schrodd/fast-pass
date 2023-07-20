import { FormEvent } from "react";

function getValidNumberOrOriginalString(value: string): number | string {
  const parsedNumber = Number(value);
  return isNaN(parsedNumber) ? value : parsedNumber;
}

export default function getFormData(event: FormEvent) {
  const formData: any = new FormData(event.target as HTMLFormElement);
  const data: any = {};
  for (let item of formData.entries()) {
    data[item[0]] = getValidNumberOrOriginalString(item[1]);
  }
  return data;
}
