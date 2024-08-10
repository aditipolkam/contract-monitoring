const alertOwner = async (body: unknown) => {
  try {
    const res = await fetch('http://localhost:3000/v1/alerts', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status == 200) return true;
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default alertOwner;
