<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

interface Props {
  modelValue: string;
  placeholder?: string;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Write your teaching content here...",
});

const emit = defineEmits<Emits>();

const editor = ref<Editor | undefined>(undefined);

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
    ],
    editorProps: {
      attributes: {
        "data-placeholder": props.placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      emit("update:modelValue", editor.getHTML());
    },
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && editor.value.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue);
    }
  }
);

const toggleBold = () => editor.value?.chain().focus().toggleBold().run();
const toggleItalic = () => editor.value?.chain().focus().toggleItalic().run();
const toggleUnderline = () =>
  editor.value?.chain().focus().toggleUnderline().run();
const toggleBulletList = () =>
  editor.value?.chain().focus().toggleBulletList().run();
const toggleOrderedList = () =>
  editor.value?.chain().focus().toggleOrderedList().run();
const setTextAlign = (alignment: string) =>
  editor.value?.chain().focus().setTextAlign(alignment).run();

const isActive = (name: string, options?: any) =>
  editor.value?.isActive(name, options) || false;
</script>

<template>
  <div
    class="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden glass"
  >
    <!-- Toolbar -->
    <div
      class="border-b border-gray-300 dark:border-gray-600 p-2 flex flex-wrap gap-1 bg-white/20 dark:bg-black/20"
    >
      <!-- Text Formatting -->
      <button
        @click="toggleBold"
        :class="{ 'bg-blue-100 dark:bg-blue-900': isActive('bold') }"
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold"
        type="button"
      >
        B
      </button>
      <button
        @click="toggleItalic"
        :class="{ 'bg-blue-100 dark:bg-blue-900': isActive('italic') }"
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors italic"
        type="button"
      >
        I
      </button>
      <button
        @click="toggleUnderline"
        :class="{ 'bg-blue-100 dark:bg-blue-900': isActive('underline') }"
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors underline"
        type="button"
      >
        U
      </button>

      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <!-- Lists -->
      <button
        @click="toggleBulletList"
        :class="{ 'bg-blue-100 dark:bg-blue-900': isActive('bulletList') }"
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        type="button"
      >
        •
      </button>
      <button
        @click="toggleOrderedList"
        :class="{ 'bg-blue-100 dark:bg-blue-900': isActive('orderedList') }"
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        type="button"
      >
        1.
      </button>

      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <!-- Alignment -->
      <button
        @click="setTextAlign('left')"
        :class="{
          'bg-blue-100 dark:bg-blue-900': isActive('textAlign', {
            textAlign: 'left',
          }),
        }"
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        type="button"
      >
        ⫷
      </button>
      <button
        @click="setTextAlign('center')"
        :class="{
          'bg-blue-100 dark:bg-blue-900': isActive('textAlign', {
            textAlign: 'center',
          }),
        }"
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        type="button"
      >
        ═
      </button>
      <button
        @click="setTextAlign('right')"
        :class="{
          'bg-blue-100 dark:bg-blue-900': isActive('textAlign', {
            textAlign: 'right',
          }),
        }"
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        type="button"
      >
        ⫸
      </button>
    </div>

    <!-- Editor -->
    <div class="prose-custom">
 <EditorContent :editor="editor as Editor" />
    </div>
  </div>
</template>
