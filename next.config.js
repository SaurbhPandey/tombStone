/** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'export',
// }

module.exports = {
    images: {
        domains: ['ik.imagekit.io'],
        loader: 'imgix',
        path: 'https://ik.imagekit.io/tombstonematcher/tombstone_images/',
        unoptimized: true,
    },
    output : 'export'
};
// module. Exports = nextConfig