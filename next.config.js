/* module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/1",
        permanent: true,
      },
    ];
  },
};
 */
//Para deploy estatico

module.exports = {
  output: "export",
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/1",
        permanent: true,
      },
    ];
  },
};
