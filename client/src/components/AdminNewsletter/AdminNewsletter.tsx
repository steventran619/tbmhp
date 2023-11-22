import React from 'react';
import axios from "axios";
import { NewsletterSubscriber } from '../../types';
import { Button, rem, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck } from '@tabler/icons-react';

const AdminHome = (): React.ReactElement => {
  const clipboard = useClipboard();
  const getActiveSubscribers = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/newsletter/subscribers`, {
        params: {
          isActive: true
        }
      });
    const emails = (data as NewsletterSubscriber[]).map(subscriber => subscriber.email).join(', ');
    return emails;
  }
  const handleCopyClick = async () => {
    const emails = await getActiveSubscribers();
    clipboard.copy(emails);
  }
  return (
    <>
      <h4>Newsletter Admin Settings</h4>
      <Tooltip
        label="Subscriber Emails copied!"
        offset={5}
        position="bottom"
        radius="xl"
        transitionProps={{ duration: 100, transition: 'slide-down' }}
        opened={clipboard.copied}
      >
      <Button
        variant="light"
        rightSection={
          clipboard.copied ? (
            <IconCheck style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          ) : (
            <IconCopy style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          )
        }
        radius="xl"
        size="md"
        styles={{
          root: { paddingRight: rem(14), height: rem(48) },
          section: { marginLeft: rem(22) },
        }}
        onClick={handleCopyClick}
      >
        Copy Subscribers to clipboard
      </Button>
    </Tooltip>
    </>
    
  );
};

export default AdminHome;