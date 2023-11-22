import React, { useState, useEffect } from 'react';
import axios from "axios";
import { 
  Button, 
  Tooltip,   
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem, 
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck, IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './AdminNewsletter.module.css';

interface RowData {
  id: string;
  firstname: string;
  lastname: string;
  active: boolean;
  email: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();

  return data.filter((item) => {
    // Check for string fields and the string representation of the boolean 'active' field
    return Object.keys(item).some((key) => {
      const value = item[key as keyof RowData];
      
      // Convert the 'active' boolean to its display string representation before comparison
      if (key === 'active') {
        const activeString = value ? 'active' : 'inactive';
        return activeString.startsWith(query);
      }

      // If the value is a string, check if it includes the search query
      if (typeof value === 'string') {
        return value.toLowerCase().includes(query);
      }

      return false;
    });
  });
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy, reversed, search } = payload;

  // First, filter the data based on the search criteria.
  let result = filterData(data, search);

  // If a sortBy key is provided, sort the data.
  if (sortBy) {
    result.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Check if the values are strings and use localeCompare for sorting.
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return reversed
          ? bValue.localeCompare(aValue) 
          : aValue.localeCompare(bValue); 
      }

      // If the type of the field is boolean, convert to number for comparison.
      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return reversed
          ? (Number(bValue) - Number(aValue)) 
          : (Number(aValue) - Number(bValue)); 
      }

      return 0; // In case of no sorting or unknown types, keep original order.
    });
  }

  return result;
}
const AdminHome = (): React.ReactElement => {
  const [search, setSearch] = useState('');
  const [subscribers, setSubscribers] = useState<RowData[]>([]);
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const clipboard = useClipboard();

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const fetchedSubscribers = await getSubscribers();
        setSubscribers(fetchedSubscribers); // Set the fetched data
        setSortedData(fetchedSubscribers); // Set sorted data to fetched data initially
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    };

    fetchSubscribers();
  }, []);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(subscribers, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(subscribers, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.email}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.firstname}</Table.Td>
      <Table.Td>{row.lastname}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.active ? 'Active' : 'Inactive'}</Table.Td>
    </Table.Tr>
  ));

  const getSubscribers = async (): Promise<RowData[]> => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/newsletter/subscribers`);
    
    // Map the data to conform to the RowData structure
    return data.map((subscriber: any) => ({
      id: subscriber._id, // Adjust this line to map _id to id
      firstname: subscriber.firstname,
      lastname: subscriber.lastname,
      email: subscriber.email,
      active: subscriber.active
    }));
  }
  const handleCopyClick = async () => {
    try {
      const subscribers = await getSubscribers();
      const activeEmails = subscribers
        .filter(subscriber => subscriber.active)
        .map(subscriber => subscriber.email)
        .join(', ');
      clipboard.copy(activeEmails);
    } catch (error) {
      console.error('Failed to fetch or copy subscribers: ', error);
    }
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
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('id')}
            >
              id
            </Th>
            <Th
              sorted={sortBy === 'firstname'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('firstname')}
            >
              First Name
            </Th>
            <Th
              sorted={sortBy === 'lastname'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('lastname')}
            >
              Last Name
            </Th>
            <Th
              sorted={sortBy === 'email'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('email')}
            >
              Email
            </Th>
            <Th
              sorted={sortBy === 'active'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('active')}
            >
              Active
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
    </>
    
  );
};

export default AdminHome;