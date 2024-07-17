// components/SkeletonLoader.js
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonLoader = () => (
  <Box px={4} mt={4}>
    <Skeleton variant="rectangular" height={"40vh"} />
    <Skeleton variant="text" height={"30vh"} />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
  </Box>
);

export default SkeletonLoader;
