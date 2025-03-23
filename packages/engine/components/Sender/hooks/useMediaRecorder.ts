import { ref, Ref, shallowRef } from 'vue';

export function useMediaRecorder(stream: Ref<MediaStream | undefined>) {
  const mediaRecorder: Ref<MediaRecorder | undefined> = shallowRef();

  const audioChunks: Ref<BlobPart[]> = ref([]);

  const audioBlob: Ref<Blob | null> = ref(null);

  function startRecording() {
    if (!stream.value) return;

    audioChunks.value = [];

    mediaRecorder.value = new MediaRecorder(stream.value);

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunks.value.push(event.data);
    };

    mediaRecorder.value.start(500);
  }

  function stopRecording() {
    if (!mediaRecorder.value || mediaRecorder.value.state === 'inactive') return;

    mediaRecorder.value.stop();

    audioBlob.value = new Blob(audioChunks.value, { type: 'audio/webm' });
  }

  return {
    startRecording,
    stopRecording,
    getAudioBlob: () => audioBlob.value
  };
}
