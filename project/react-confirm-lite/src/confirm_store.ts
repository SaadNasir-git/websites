import type { ConfirmOptions, ConfirmInput } from "./types";

type Listener = (alerts: ConfirmOptions[]) => void;

let containerId: string = '';
let confirms: ConfirmOptions[] = [];
let listeners = new Set<Listener>();
let isActiveContainer: boolean = false
const containers: NodeListOf<Element>[] = [];

// Global lock - only ONE container can show alerts at a time
let activeContainerId: string | null = null;

export function setIsContainerActive(value: boolean) {
  isActiveContainer = value;
}

export function getIsContainerActive() {
  return isActiveContainer;
}

export function setActiveContainer(id: string | null) {
  activeContainerId = id;
}

export function getActiveContainerId(): string | null {
  return activeContainerId;
}

export async function addAlert(input: ConfirmInput): Promise<boolean | null> {
  return new Promise((resolve) => {
    const alert: ConfirmOptions = {
      id: input.id || '', // Keep the ID for container targeting
      title: input.title || "Confirm",
      message: input.message,
      okText: input.okText,
      cancelText: input.cancelText,
      colorSchema: input.colorSchema,
      resolve
    };

    confirms = [...confirms, alert];

    // If this alert has an ID, set it as the active container
    if (input.id) {
      setActiveContainer(input.id);
    }
    // If this alert doesn't have an ID, clear any active container
    // so any container can potentially show it
    else {
      setActiveContainer(null);
    }

    if (confirms.length === 1) {
      emit();
    }
  });
}

export async function closeAlert(result: boolean | null) {
  const alert = confirms[0];
  containerId = '';
  if (!alert) return;

  // Resolve current alert
  alert.resolve(result);
  // Remove from queue
  confirms = confirms.slice(1);

  // If there are no more alerts, clear the active container
  if (confirms.length === 0) {
    setActiveContainer(null);
  }

  emit();
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  listener(confirms);
  return () => listeners.delete(listener);
}

export function emit() {
  listeners.forEach((listener) => listener(confirms));
}


const EventListener = (e: PointerEvent) => {
  if (containers.length === 0) {
    containers.push(document.querySelectorAll('.null-confirm-container'));
  }
  if (containers.length === 0) return;
  if (containers.length === 1) {
    containerId = containers[0][0].id
    return
  }

  let parentElement = e.view?.document.activeElement?.parentElement;
  let container = parentElement?.querySelector('.null-confirm-container');

  while (true) {
    if (container?.id) {
      break;
    }
    parentElement = parentElement?.parentElement;
    container = parentElement?.querySelector('.null-confirm-container');
  }

  if (container?.id) {
    containerId = container.id;
  }
}

export async function getElement() {
  document.addEventListener('click', EventListener, { once: true })
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      document.removeEventListener('click', EventListener)
      resolve()
    }, 0);
  })
  if (containerId === '') {
    if (containers.length === 0) {
      containers.push(document.querySelectorAll('.null-confirm-container'));
    }
    return containers[0][0].id
  }
  return containerId;
}