import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadImage(file: File, bucket: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  // Upload image
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError.message);
    throw new Error(uploadError.message);
  }

  // Generate public URL
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  if (!data?.publicUrl) {
    throw new Error('Failed to get public URL');
  }

  return data.publicUrl;
}


// src/lib/uploadImage.ts
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// if (!supabaseUrl || !supabaseKey) {
//   console.error('Missing Supabase env vars NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
// }

// const supabase = createClient(supabaseUrl, supabaseKey);

// export async function uploadImage(file: File, bucket: string) {
//   if (!file) throw new Error('No file provided');

//   const fileExt = file.name.split('.').pop();
//   const fileName = `${Date.now()}.${fileExt}`;
//   const filePath = `${fileName}`;

//   try {
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from(bucket)
//       .upload(filePath, file, {
//         cacheControl: '3600',
//         upsert: true,
//         contentType: file.type,
//       });

//     if (uploadError) {
//       // More verbose logging to help debugging (includes details from Supabase)
//       console.error('Supabase upload error object:', uploadError);
//       throw new Error(uploadError.message || 'Upload error');
//     }

//     // Get public URL (make sure the bucket is set to public in Supabase dashboard)
//     const { data: publicData, error: publicError } = supabase.storage
//       .from(bucket)
//       .getPublicUrl(filePath);

//     if (publicError) {
//       console.error('Error getting public URL:', publicError);
//       throw new Error(publicError.message || 'Failed to get public URL');
//     }

//     const publicUrl = publicData?.publicUrl;
//     if (!publicUrl) {
//       throw new Error('Failed to get public URL');
//     }

//     return publicUrl;
//   } catch (err: any) {
//     console.error('uploadImage caught error:', err);
//     // Rethrow with readable message
//     throw new Error(err?.message || 'Image upload failed');
//   }
// }
