import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase credentials not found in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const uploadImage = async (filePath, fileName) => {
  try {
    const fileBuffer = fs.readFileSync(filePath)
    const ext = path.extname(fileName)
    const uniqueName = `railing-${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`

    console.log(`📤 Uploading ${fileName}...`)

    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(uniqueName, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(uniqueName)

    console.log(`✅ Uploaded: ${fileName} → ${publicUrl}`)
    return publicUrl
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message)
    return null
  }
}

const main = async () => {
  console.log('🚀 Starting upload of railing project images...\n')

  const imagesDir = path.join(__dirname, 'public/images/projects/railing')

  // Check if directory exists
  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Directory not found: ${imagesDir}`)
    process.exit(1)
  }

  // Upload main image
  const mainImagePath = path.join(imagesDir, 'main.jpg')
  const mainImageUrl = await uploadImage(mainImagePath, 'main.jpg')

  if (!mainImageUrl) {
    console.error('❌ Failed to upload main image. Aborting.')
    process.exit(1)
  }

  // Upload additional images
  const additionalImages = []
  for (let i = 1; i <= 8; i++) {
    const imgPath = path.join(imagesDir, `img-${i}.jpg`)
    if (fs.existsSync(imgPath)) {
      const url = await uploadImage(imgPath, `img-${i}.jpg`)
      if (url) additionalImages.push(url)
    }
  }

  console.log(`\n✅ Upload complete!`)
  console.log(`📊 Main image: 1`)
  console.log(`📊 Additional images: ${additionalImages.length}`)

  // Now update the database
  console.log('\n📝 Updating database...')

  const { data, error } = await supabase
    .from('projects')
    .update({
      main_image_url: mainImageUrl,
      images: additionalImages,
      updated_at: new Date().toISOString()
    })
    .eq('title', 'Professional Railing Works & Finishing')
    .select()

  if (error) {
    console.error('❌ Failed to update database:', error.message)
    console.log('\n⚠️  Images uploaded but database not updated.')
    console.log('📋 Please update manually with these URLs:')
    console.log('Main image:', mainImageUrl)
    console.log('Additional images:', JSON.stringify(additionalImages, null, 2))
  } else {
    console.log('✅ Database updated successfully!')
    console.log('🎉 Your railing project is now live on your website!')
  }
}

main().catch(console.error)
