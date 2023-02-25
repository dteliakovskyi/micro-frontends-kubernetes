export const calculateTime = (time: string) => {
  const msToLeft = new Date(time).getTime() - new Date().getTime();

  return msToLeft > 0 ? Math.round(msToLeft / 1000) : 0;
};

export function getUserEmail() {
  return sessionStorage.getItem("userEmail");
}
