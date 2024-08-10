const alertOwner = async () => {
  try {
    const res = await fetch('http://localhost:3000/v1/alerts', {
      method: 'POST',
      body: JSON.stringify({
        type: 'alert',
        to: 'aditipolkam07@gmail.com',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res.status);

    if (res.status == 200) return true;
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default alertOwner;
