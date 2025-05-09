import { ref, Ref, shallowRef } from 'vue';

export function useMediaRecorder(stream: Ref<MediaStream | undefined>) {
  const mediaRecorder: Ref<MediaRecorder | undefined> = shallowRef();

  const chunks: Ref<BlobPart[]> = ref([]);

  const frameBuffer: Ref<Blob | null> = ref(null);

  function startRecording() {
    if (!stream.value) return;

    chunks.value = [];

    mediaRecorder.value = new MediaRecorder(stream.value);

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.value.push(event.data);
    };

    mediaRecorder.value.start(500);
  }

  function stopRecording() {
    if (!mediaRecorder.value || mediaRecorder.value.state === 'inactive') return;

    mediaRecorder.value.stop();

    frameBuffer.value = new Blob(chunks.value, { type: 'voice/webm' });
  }

  return {
    startRecording,
    stopRecording,
    getFrameBuffer: () => frameBuffer.value
  };
}
