<template>
  <div v-if="!open">
    <button
      class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      @click="opensidebar()"
    >
      +
    </button>
  </div>
  <div v-else-if="open">
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <div class="fixed inset-0" />
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
            >
              <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <DialogPanel class="pointer-events-auto w-screen max-w-md">
                  <div
                    class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
                  >
                    <div class="px-4 sm:px-6">
                      <div class="flex align-center justify-between">
                        <DialogTitle
                          class="text-base font-semibold leading-6 text-gray-900"
                          >Notes</DialogTitle
                        >
                        <div class="space-y-6 lg:col-span-2 lg:col-start-1">
                          <div class="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              @click="open = false"
                            >
                              <span class="sr-only">Close panel</span>
                              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                          <div class="py-90px"></div>
                        </div>
                      </div>
                      <div class="relative mt-6 flex-1 px-4 sm:px-6"></div>
                      <!-- Description list-->
                      <!-- Comments-->
                      <section aria-labelledby="notes-title">
                        <div
                          class="bg-white shadow sm:overflow-hidden sm:rounded-lg"
                        >
                          <div class="divide-y divide-gray-200">
                            <div class="px-4 py-5 sm:px-6"></div>
                            <div class="px-4 py-6 sm:px-6">
                              <ul role="list" class="space-y-8">
                                <li v-for="comment in note" :key="comment.id">
                                  <div class="flex space-x-3">
                                    <div>
                                      <div class="text-sm flex flex-row">
                                        <a
                                          href="#"
                                          class="font-medium text-gray-900"
                                          @mouseover="showhover = true"
                                          @mouseout="showhover = false"
                                          >mounika meesa</a>
                                          <PencilSquareIcon
                                      name="iconoir:edit-pencil"
                                      size="20"
                                      class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                      @click="editNote(comment)">
                                     <Edit :model="model" :comment="comment.note"></Edit>
                                          </PencilSquareIcon>
                                          <TrashIcon  
                                          name="bytesize:trash"
                                      size="16"
                                      class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500:text-red-600"
                                      @click="deleteNote(comment)">
                                    </TrashIcon>
                                      </div>
                                      <div class="mt-1 text-sm text-gray-700">
                                        <p>{{ comment.note }}</p>
                                      </div>
                                      <div class="mt-2 space-x-2 text-sm">
                                        <span
                                          class="font-medium text-gray-500"
                                          >{{ comment.date }}</span
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </section>
                      <div class="flex align-item justify-center">
                        <label
                          for="small-input"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        ></label>
                        <input
                          v-model="notesValue"
                          type="text"
                          id="small-input"
                          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "
                          @click="postData">send</button>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
  <List></List>
</template>
<script setup>
import { ref } from "vue";
import {
XMarkIcon,
PencilSquareIcon,
TrashIcon,
} from "@heroicons/vue/24/outline";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
const showhover = ref(false);
const notesValue = ref("");
const model = ref([]);
//  const note = ref([])
  const user = {
name: "Whitney Francis",
email: "whitney@example.com",
imageUrl: "",
};
let notesData=notesValue.value
const prefillData = (comment) => {
  notesValue.value = comment.value;
};

 const editNote = (comment) => {
     const editOptions = {
      method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiYmZlOTY3MDc0YzJhNGVlNDhiODFlYWU1ZmU5ZThhMjkiLCJkIjoiMTY4MDA4MSIsInIiOiJzYSIsInAiOiJmcmVlIiwiYSI6ImZpbmRlci5pbyIsImwiOiJ1czEiLCJleHAiOjE2ODMyNzkyNzB9._HklK6rl9AWu3mp4kRdrOIsxyEP-jNpG7kgF3K-5GlA`,
    },
    body: {
      entity_id: "1415",
      project_id: "1",
      note:notesData,
      entity: "CONTACTS",
    },
  }
  const editTemplateData = useAuthLazyFetchPut (
      `https://v1-orm-lib.mars.hipso.cc/notes/${comment.uid}`,
  editOptions
  )
  model.value=true;
  console.log(model.value);
  console.log("mouni",comment)
      };
     
 const deleteNote = async (comment) => {
  await useAuthLazyFetchDelete(`https://v1-orm-lib.mars.hipso.cc/notes/${comment.uid}`,{})
console.log(comment,"erwet")
  note.value.splice(comment, 1);
};
async function postData() {
  const postoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiYmZlOTY3MDc0YzJhNGVlNDhiODFlYWU1ZmU5ZThhMjkiLCJkIjoiMTY4MDA4MSIsInIiOiJzYSIsInAiOiJmcmVlIiwiYSI6ImZpbmRlci5pbyIsImwiOiJ1czEiLCJleHAiOjE2ODMyNzkyNzB9._HklK6rl9AWu3mp4kRdrOIsxyEP-jNpG7kgF3K-5GlA`,
    },
    body: {
      entity_id: "1415",
      project_id: "1",
      note: notesValue.value,
      entity: "CONTACTS",
    },
  };
  const data = await useAuthLazyFetch(
    "https://v1-orm-lib.mars.hipso.cc/notes/CONTACTS/1415",
    postoptions
  );
  note.value.push({
    entity_id: "1415",
    project_id: "1",
    note: notesValue.value,
    entity: "CONTACTS",
  });
  notesValue.value = ''
}

const { pending, data: note } = await useAuthLazyFetch(
  "https://v1-orm-lib.mars.hipso.cc/notes/entity/CONTACTS/1415?project_id=1&offset=0&limit=100&sort_column=id&sort_direction=desc",
  {}
  
);

console.log(note);

const open = ref(false);

function opensidebar() {
  open.value = !open.value;
}

</script>
