import { Slot, component$ } from "@builder.io/qwik";

export const Card = component$((props: { title: string }) => {
  return (
    <div class="rounded-sm border border-gray-200 bg-white p-4 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <h5 class="mb-4 font-bold tracking-tight text-gray-900 dark:text-white">
        {props.title}
      </h5>
      <Slot />
    </div>
  );
});
