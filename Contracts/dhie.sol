// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

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
        string CID;
        bool forSale;
    }

    mapping (address => mapping (string=> fileOwner)) fileUpload;

    mapping (address => mapping( string => string)) fileBought;

    // Mapping to store user information
    mapping(address => User) users;

    // mapping(address => string) public fileOwner;

    // Event to notify registration
    //event UserRegistered(address userAddress, string name, Role role);

    // Function to register a user
    function registerUser(string memory _name, Role _role) public {
        require(users[msg.sender].isRegistered == false, "User already registered.");

        users[msg.sender] = User(msg.sender, _name, _role, true);

        //emit UserRegistered(msg.sender, _name, _role);
    }

    function Uploading(string calldata _fileId, address _owner, string calldata _CID) external{
        bool _forSale = false;
        fileUpload[_owner][_fileId]=fileOwner(_CID,_forSale);
    }

    function fileForSale(string calldata _fileId)external{
        bool _forSale = true;
        fileUpload[msg.sender][_fileId].forSale=_forSale;
    }

    function fileNotForSale(string calldata _fileId)external{
        bool _forSale = false;
        fileUpload[msg.sender][_fileId].forSale=_forSale;
    }

    function sell(address _owner, string calldata _fileId) external{
        require(fileUpload[_owner][_fileId].forSale == true,"Not For Sale");
        string memory _CID = fileUpload[_owner][_fileId].CID;
        fileBought[msg.sender][_fileId]=_CID;
    }

    function getUserdetails (address _user) public view returns (address,string memory ,Role,bool) {
        
        address userAddress = users[_user].userAddress;
        string memory name = users[_user].name;
        Role role = users[_user].role;
        bool isRegistered=users[_user].isRegistered;
       return(userAddress, name, role, isRegistered);
    }

    function getFileForOwner(string calldata _fileId) public view returns(string memory){
        string memory CID = fileUpload[msg.sender][_fileId].CID;
        return(CID);
    }

    function getFileForBuyer(string calldata _fileId) public view returns(string memory){
        string memory CID = fileBought[msg.sender][_fileId];
        return(CID);
    }

}
