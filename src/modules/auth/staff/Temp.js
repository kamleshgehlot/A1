<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  <form onSubmit={handleSubmit}>
    <DialogTitle id="form-dialog-title">Add Franchise</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        name="name"
        label="Name"
        type="text"
        onChange={handleInputChange}
        value={inputs.name}
        required
        onBlur={handleNameBlurChange}
        placeholder="ex: Rentronics Hemilton"
        fullWidth
      />
      {/* <TextField
              margin="dense"
              id="location"
              name="location"
              label="Location"
              type="text"
              onChange={handleInputChange} value={inputs.location} required
              fullWidth
            /> */}

      <InputLabel htmlFor="location-simple">Location</InputLabel>
      <Select
        value={inputs.location}
        onChange={handleInputChange}
        inputProps={{
              name: 'age',
              id: 'location-simple',
            }}
        fullWidth
        label="Location"
        required
        margin="dense"
      >
        {cityList.length > 0
          cityList.map(data => {
            return (
              // <MenuItem value={data.id}>{data.city}</MenuItem>
              console.log('from : ', data.city)
            );
          })}
      </Select>

      {/* <NativeSelect
                value={inputs.location}
                onChange={handleInputChange}
                inputProps={{
                  name: 'age',
                  id: 'location-simple',

                }}
                fullWidth
                label="Location"
                required
                margin="dense"
            >

              <option value="Datacity">None</option>

              {
                cityList.length > 0 && cityList.map((data) => {
                  return(
                    <option value={data.id}></option>

                    // console.log(data.city)
                  )
                })
              }
            </NativeSelect> */}

      <TextField
        margin="dense"
        id="contact"
        name="contact"
        label="Contact"
        type="text"
        onChange={handleInputChange}
        value={inputs.contact}
        required
        fullWidth
      />
      <TextField
        margin="dense"
        id="abn"
        name="abn"
        label="ABN"
        type="text"
        onChange={handleInputChange}
        value={inputs.abn}
        required
        fullWidth
      />
      <br />
      <Typography variant="h6" component="h2">
        Owner Details
      </Typography>
      <Divider />
      <TextField
        margin="dense"
        id="user_name"
        name="user_name"
        label="User Name"
        type="text"
        onChange={handleInputChange}
        value={inputs.user_name}
        required
        onBlur={handleNameBlurChange}
        fullWidth
      />
      <TextField
        margin="dense"
        id="user_id"
        name="user_id"
        label="User Id"
        type="text"
        onChange={handleInputChange}
        value={inputs.user_id}
        required
        fullWidth
      />
      <TextField
        margin="dense"
        id="password"
        name="password"
        label="Password"
        type="text"
        onChange={handleInputChange}
        value={inputs.password}
        required
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSubmit} color="primary">
        Add
      </Button>
      <Button onClick={handleClose} color="primary">
        Cancle
      </Button>
    </DialogActions>
  </form>
</Dialog>;
