
pragma solidity ^0.8.0;

contract HealthDataExchange {
    // Enumeration for user role
    enum Role {
        Doctor,
        Patient,
        Buyer
    }

    // Struct to store user information
    struct User {
        address userAddress;
        string name;
        Role role;
        bool isRegistered;
    }

    struct fileOwner{
        address owner;
        string file_ID;
        string file_CID;
    }

    // Mapping to store user information
    mapping(address => User) public users;

    // mapping(address => string) public fileOwner;

    // Event to notify registration
    event UserRegistered(address userAddress, string name, Role role);

    // Function to register a user
    function registerUser(string memory _name, Role _role) public {
        require(users[msg.sender].isRegistered == false, "User already registered.");

        users[msg.sender] = User(msg.sender, _name, _role, true);

        emit UserRegistered(msg.sender, _name, _role);
    }

    // function upload(address _owner,string calldata _file_CID) external{
    //     //
    //     fileOwner[_owner]=_file_CID;
    // }



    function getUserdetails (address _user) public view returns (address,string memory ,Role,bool) {
        
        address userAddress = users[_user].userAddress;
        string memory name = users[_user].name;
        Role role = users[_user].role;
        bool isRegistered=users[_user].isRegistered;
       return(userAddress, name, role, isRegistered);
    }

    
     



    // Function to check if a user is authorized for a specific role
    function isAuthorized(address _user, Role _role) public view returns (bool) {
        return users[_user].role == _role && users[_user].isRegistered;
    }

    // Function to update user role
    function updateRole(address _user, Role _role) public {
        require(msg.sender == _user || msg.sender == address(this), "Unauthorized access.");
        users[_user].role = _role;
    }


}
