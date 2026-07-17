export function updateElo(
  ratingA: number,
  ratingB: number,
  winner: "A" | "B"
) {
  const K = 24;

  const expectedA =
    1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));

  const expectedB =
    1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));

  let newA = ratingA;
  let newB = ratingB;

  if (winner === "A") {
    newA = ratingA + K * (1 - expectedA);
    newB = ratingB + K * (0 - expectedB);
  } else {
    newA = ratingA + K * (0 - expectedA);
    newB = ratingB + K * (1 - expectedB);
  }

  return {
    newA: Math.round(newA),
    newB: Math.round(newB),
  };
}