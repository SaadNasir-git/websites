import { addAlert, getElement } from "./confirm_store";
import type { ConfirmInput } from "./types";

export async function confirm(input: string | ConfirmInput, closest?: boolean): Promise<boolean | null> {
  let containerId;

  if (typeof input === 'string') {
    if (closest) {
      containerId = await getElement();
    }
    const result = await addAlert({ 
      message: input, 
      id: containerId
    });
    return result;
  } 
  
  if (!input.id) {
    if (closest) { 
      containerId = await getElement();
    }
    const result = await addAlert({ 
      ...input,
      id: containerId 
    });
    return result;
  } 
  
  const result = await addAlert(input);
  return result;
}