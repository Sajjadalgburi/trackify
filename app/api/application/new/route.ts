// pass in Next types to the params req, and res
export const POST = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return new Response("cannot create a new application", {
      status: 401,
    });
  }
};
