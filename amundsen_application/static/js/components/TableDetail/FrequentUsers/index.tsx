import * as React from 'react';
import * as Avatar from 'react-avatar';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { TableReader } from 'interfaces';
import AppConfig from 'config/config';
import { logClick } from 'ducks/utilMethods';

export interface FrequentUsersProps {
  readers: TableReader[];
}

export function renderReader(reader: TableReader, index: number, readers: TableReader[]) {
  const user = reader.user;
  let link = user.email;
  let target = '_blank';
  if (AppConfig.indexUsers.enabled) {
    link = `/user/${user.email}?source=frequent_users`;
    target = '';
  }

  return (
    <OverlayTrigger
      key={ user.email }
      trigger={['hover', 'focus']}
      placement="top"
      overlay={
        <Popover id="popover-trigger-hover-focus">
          {user.email}
        </Popover>
      }
    >
      <Link
        className="avatar-overlap"
        id="frequent-users"
        onClick={ logClick }
        to={ link }
        target={ target }
      >
        <Avatar
          name={ user.email }
          round={ true }
          size={ 25 }
          style={{ zIndex: readers.length - index, position: 'relative' }}
        />
      </Link>
    </OverlayTrigger>
  );
};



const FrequentUsers: React.SFC<FrequentUsersProps> = ({ readers }) => {
  if (readers.length === 0) {
    return (<label className="body-3">No frequent users exist</label>);
  }

  return (
    <div className="frequent-users">
      {
        readers.map(renderReader)
      }
    </div>
  )
};

export default FrequentUsers;
