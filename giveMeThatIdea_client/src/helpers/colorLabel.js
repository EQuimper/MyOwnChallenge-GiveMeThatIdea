export const colorLabel = name => {
  switch (name) {
    case 'Web Developer':
      return 'teal';
    case 'Web Developer Portfolio':
      return 'red';
    case 'Hackathon Project':
      return 'black';
    case 'Web Designer Portfolio':
      return 'blue';
    case 'Web Designer':
      return 'yellow';
    default:
      return null;
  }
};
