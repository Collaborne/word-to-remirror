import { SocialEditor } from '@remirror/react-editors/social';
const USERS = [
  { id: 'joe', label: 'Joe' },
  { id: 'john', label: 'John' },
];
const TAGS = ['remirror', 'editor'];
function App() {
  return (
    <div style={{ padding: 16 }}>
      <SocialEditor users={USERS} tags={TAGS} />
    </div>
  );
}
export default App;
