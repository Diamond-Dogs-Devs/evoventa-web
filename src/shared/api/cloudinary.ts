export const uploadImageToCloudinary = async (file: File, type: string) => {
  const sigRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cloudinary/signature?type=${type}`
  );

  const { signature, timestamp, apiKey, cloudName, folder } =
    await sigRes.json();

  const formData = new FormData();

  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Cloudinary upload failed');
  }

  return response.json();
};
