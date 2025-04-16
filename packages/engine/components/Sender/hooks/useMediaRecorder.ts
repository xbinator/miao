import { ref, Ref, shallowRef } from 'vue';

export function useMediaRecorder(stream: Ref<MediaStream | undefined>) {
  const mediaRecorder: Ref<MediaRecorder | undefined> = shallowRef();

  const voiceChunks: Ref<BlobPart[]> = ref([]);

  const voiceBlob: Ref<Blob | null> = ref(null);

  function startRecording() {
    if (!stream.value) return;

    voiceChunks.value = [];

    mediaRecorder.value = new MediaRecorder(stream.value);

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) voiceChunks.value.push(event.data);
    };

    mediaRecorder.value.start(500);
  }

  function stopRecording() {
    if (!mediaRecorder.value || mediaRecorder.value.state === 'inactive') return;

    mediaRecorder.value.stop();

    voiceBlob.value = new Blob(voiceChunks.value, { type: 'voice/webm' });
  }

  return {
    startRecording,
    stopRecording,
    getVoiceBlob: () => voiceBlob.value
  };
}
