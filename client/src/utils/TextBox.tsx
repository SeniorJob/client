import tw from 'tailwind-styled-components';

export const TextBox = tw.textarea`
    ml-4
    p-2
    w-3/4
    h-48
`;

export const OneLineTextBox = tw(TextBox)`
    resize-none
    h-10
`;
