import { Slot, component$ } from "@builder.io/qwik";

export const AccordionHead = component$(
  (props: { id: string; title: string; contentId: string }) => {
    return (
      <h2 id={props.id}>
        <button
          type="button"
          class="flex w-full items-center justify-between rounded-none border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-blue-100  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-blue-800"
          data-accordion-target={"#" + props.contentId}
          aria-expanded="false"
          aria-controls={props.contentId}
        >
          <span class="text-lg">{props.title}</span>
          <svg
            data-accordion-icon
            class="h-3 w-3 shrink-0 rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
    );
  },
);

export const AccordionContent = component$(
  (props: { headId: string; id: string }) => {
    return (
      <div id={props.id} class="hidden" aria-labelledby={props.headId}>
        <div
          class={
            "border-b-1 border border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900"
          }
        >
          <Slot />
        </div>
      </div>
    );
  },
);

export const Accordion = component$((props: { class?: string }) => {
  return (
    <div
      class={props.class}
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      <Slot />
    </div>
  );
});
